import { auth } from "@/auth";
import { YT_REGEX } from "@/lib/utils";
import { streamSchema } from "@/schema";
//@ts-expect-error
import youtubesearchapi from 'youtube-search-api';
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
  
//   const session = await auth();
  

//   try {
//     const host = await prisma.user.findUnique({
//       where: {
//           email: session?.user?.email || "",
//       },
//       select: {
//         id: true,
//       },
//     });
    
//     const body = streamSchema.parse(await req.json())
//     const { hostId, url, spaceId } = body

//     // console.log("hostId",hostId,url,spaceId)

//     if (!url.trim()) {
//       return NextResponse.json(
//         {
//           message: "YouTube link cannot be empty",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     const isYt = url.match(YT_REGEX);
//     const extractedId = url ? url.match(YT_REGEX)?.[1] : null;
//     if (!isYt || !extractedId) {
//       return NextResponse.json(
//         {
//           message: "Invalid YouTube URL format",
//         },
//         {
//           status: 400,
//         },
//       );
//     }
//     const resp = await youtubesearchapi.GetVideoDetails(extractedId)
    

//     const Thumbnails = resp.thumbnail.thumbnails
//     Thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1)
//     console.log(Thumbnails)
    
//     const newSong = await prisma.song.create({
//       data: {
//         userId: hostId,
//         url,
//         artist: resp.channel ?? "Unknown",
//         spaceId,
//         extractedId,
//         smallImg:
//           (Thumbnails.length > 1
//             ? Thumbnails[Thumbnails.length - 2].url
//             : Thumbnails[Thumbnails.length - 1].url) ??
//           "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
//         bigImg: Thumbnails[Thumbnails.length - 1].url ??
//           "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
//         title: resp.title ?? "Cant find title",
//         addedBy: host?.id || "",

//       },
//     });
//     return NextResponse.json({
//       ...newSong,
//       hasUpvoted: false,
//       upvotes: 0,
//     });
//   } catch (error: any) {
//     return NextResponse.json({
//       error: error.message,
//     }, { status: 501 });
//   }

// }

export async function POST(req: NextRequest) {
  const session = await auth();
  const defaultThumbnail = "/song-static.jpg"; // Default thumbnail URL

  try {
    const host = await prisma.user.findUnique({
      where: { email: session?.user?.email || "" },
      select: { id: true },
    });

    const body = streamSchema.parse(await req.json());
    const { hostId, url, spaceId } = body;

    if (!url.trim()) {
      return NextResponse.json(
        { message: "YouTube link cannot be empty" },
        { status: 400 }
      );
    }

    const extractedId = url.match(YT_REGEX)?.[1];
    if (!extractedId) {
      return NextResponse.json(
        { message: "Invalid YouTube URL format" },
        { status: 400 }
      );
    }

    const resp = await youtubesearchapi.GetVideoDetails(extractedId);
    if (!resp || !resp.thumbnail) {
      return NextResponse.json(
        { message: "Could not fetch video details from YouTube" },
        { status: 400 }
      );
    }

    // Robust thumbnail handling
    let smallImg = defaultThumbnail;
    let bigImg = defaultThumbnail;
    if (resp.thumbnail.thumbnails?.length > 0) {
      const sortedThumbnails = [...resp.thumbnail.thumbnails].sort((a, b) => a.width - b.width);
      smallImg = sortedThumbnails[0]?.url || defaultThumbnail;
      bigImg = sortedThumbnails[sortedThumbnails.length - 1]?.url || defaultThumbnail;
    }

    const newSong = await prisma.song.create({
      data: {
        userId: hostId,
        url,
        artist: resp.channel ?? "Unknown",
        spaceId,
        extractedId,
        smallImg,
        bigImg,
        title: resp.title ?? "Unknown title",
        addedBy: host?.id || "",
      },
    });

    return NextResponse.json({
      ...newSong,
      hasUpvoted: false,
      upvotes: 0,
    });

  } catch (error: any) {
    console.error("Error in song creation:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
    const isCreator = session?.user?.id === hostId

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

    return NextResponse.json({ error: "Something went wrong" }, { status: 501 })
  }
}


export async function DELETE(req: NextRequest) {
    const body = await req.json()
    const { spaceId } = body
    
    if (!spaceId) {
        return NextResponse.json({
            success: false, 
            message: "Space ID is required"
        }, { status: 400 })
    }

    try {
        // Delete related votes first
        await prisma.vote.deleteMany({
            where: {
                song: {
                    spaceId: spaceId
                }
            }
        })

        // Delete current song reference
        await prisma.currentSong.deleteMany({
            where: {
                spaceId: spaceId
            }
        })

        // Delete songs associated with the space
        await prisma.song.deleteMany({
            where: {
                spaceId: spaceId
            }
        })

        // Finally, delete the space
        await prisma.space.delete({
            where: {
                id: spaceId
            }
        })

        return NextResponse.json({
            success: true, 
            message: "Space and all associated data deleted successfully"
        }, { status: 200 })
    } catch(error) {
        console.error("Error deleting space:", error)

        return NextResponse.json({
            success: false, 
            message: "Something went wrong while deleting the space",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}