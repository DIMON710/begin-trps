import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/trpc/posts.getAll", "/api/trpc/profile.getUserByUsername"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};