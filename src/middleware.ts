import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/:locale/sign-in", "/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/trpc/example.hello"],
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};