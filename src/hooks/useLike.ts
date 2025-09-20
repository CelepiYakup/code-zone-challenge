import { useState } from "react";


export const useLike = (initialCount: number = 0 ) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const currentLikes = initialCount + (isLiked ? 1 : 0);

    return {
        isLiked,
        handleLike,
        currentLikes
    }
}