import { auth } from "@/auth";
import { YT_REGEX } from "@/lib/utils";
import { streamSchema, upvoteSchema } from "@/schema";
//@ts-ignore
import youtubesearchapi from 'youtube-search-api';
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest,res: NextResponse) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to retrieve space information" },
      { status: 401 }
    );
  }


  
  
  try {
    const body = streamSchema.parse(await req.json())
    const { hostId, url, spaceId } = body

    
    if (!url.trim()) {
      return NextResponse.json(
        {
          message: "YouTube link cannot be empty",
        },
        {
          status: 400,
        },
      );
    }

    const isYt = url.match(YT_REGEX);
    const extractedId = url ? url.match(YT_REGEX)?.[1] : null;
    
    if (!isYt || !extractedId) {
      return NextResponse.json(
        {
          message: "Invalid YouTube URL format",
        },
        {
          status: 400,
        },
      );
    }
    const resp = await youtubesearchapi.GetVideoDetails(extractedId)
    // console.log('check',resp);
    if (hostId !== session.user.id) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      // const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    

      const userRecentStreams = await prisma.song.count({
        where: {
          userId:hostId,
          addedBy: session.user.id,
          createdAt: {
            gte: tenMinutesAgo,
          },
        },
      });

    
      
    const duplicateSong = await prisma.song.findFirst({
      where: {
        userId:hostId,
        extractedId,
        createdAt: {
          gte: tenMinutesAgo,
        },
      },
    });
    if (duplicateSong) {
      return NextResponse.json(
        {
          message: "This song was already added in the last 10 minutes",
        },
        {
          status: 429,
        },
      );
    }
  }
    const Thumbnails = resp.thumbnail.thumbnails
    Thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1)

    const newSong = await prisma.song.create({
      data: {
        userId:hostId,
        url,
        artist:resp.channel ?? "Unknown",
        spaceId,
        extractedId,
        smallImg:
          (Thumbnails.length > 1
            ? Thumbnails[Thumbnails.length - 2].url
            : Thumbnails[Thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:  Thumbnails[Thumbnails.length - 1].url ??
        "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        title: resp.title ?? "Cant find title",
        addedBy: session.user.id,

      },
    });

    return NextResponse.json({
      ...newSong,
      hasUpvoted: false,
      upvotes: 0,
    });
  } catch (error:any) {
    return NextResponse.json({
      error: error.message,
    },{status:501});
  }

}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to retrieve space information" },
      { status: 403 }
    );
  }
  try {
    const spaceId = req.nextUrl.searchParams.get("spaceId");
    const user = session.user
    if (!spaceId) {
      return NextResponse.json({
        message: "Error"
      }, {
        status: 411
      })
    }

    const [space, activeStream] = await Promise.all([
      prisma.space.findUnique({
        where: {
          id: spaceId,
        },
        include: {
          songs: {
            include: {
              _count: {
                select: {
                  votes: true
                }
              },
              votes: {
                where: {
                  userId: user.id
                }
              }

            },
            where: {
              played: false
            }
          },
          _count: {
            select: {
              songs: true
            }
          },

        }

      }),
      prisma.currentSong.findFirst({
        where: {
          spaceId: spaceId
        },
        include: {
          song: true
        }
      })
    ]);

    const hostId = space?.hostId;
    const isCreator = session.user.id === hostId

    return NextResponse.json({
      streams: space?.songs.map(({ _count, ...rest }) => ({
        ...rest,
        upvotes: _count.votes,
        haveUpvoted: rest.votes.length ? true : false
      })),
      activeStream,
      hostId,
      isCreator,
      spaceName: space?.name,
      spaceDesc: space?.description
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({error:"Something went wrong"},{status:501})
  }
}

//   export default async function PUT(req: NextRequest, res: NextResponse) {
//     const session = await auth()
//      if (!session?.user?.id) {
//         return NextResponse.json(
//           { success: false, message: "You must be logged in to retrieve space information" },
//           { status: 401 }
//         );
//       }
//       const userId = session.user.id
//       try {
//         const body = upvoteSchema.parse(await req.json());
//         const { songId } = body;

//       const vote = await prisma.vote.upsert({
//         where: {
//           userId_songId: {
//             userId,
//             songId,
//           },
//         },
//         update: {
//           value,
//         },
//         create: {
//           songId,
//           userId,
//           value,
//         },
//       });

//       res.status(200).json({ message: 'Vote updated successfully', vote });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating vote', error });
//     }
//   } 
