import { Music2, UserPlus, Headphones, Share2 } from 'lucide-react';

export const Features = [
    {
        title: "Create Your Space",
        description: "Set up your personalized music room and customize it to match your vibe.",
        icon: <Music2 size={24} className="text-light-purple" />
    },
    {
        title: "Invite Friends",
        description: "Bring your crew into your space and enjoy music together in real-time.",
        icon: <UserPlus size={24} className="text-light-purple" />
    },
    {
        title: "Listen Together",
        description: "Synchronize your music experience with friends and enjoy the same beats.",
        icon: <Headphones size={24} className="text-light-purple" />
    },
    {
        title: "Share Your Taste",
        description: "Share your favorite tracks and discover new music from your friends.",
        icon: <Share2 size={24} className="text-light-purple" />
    }
];