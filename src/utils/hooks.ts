import { useEffect, useState } from "react";


export const useIsScrollerBottomVisible = (refElement:React.RefObject<HTMLElement>) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const element = refElement.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => (setIsVisible(entry.isIntersecting)),
            {threshold:0.1}
        );

        observer.observe(element);

        return() => {
            if (element) observer.unobserve(element);
        }
    }, [refElement]);

    return isVisible;
};