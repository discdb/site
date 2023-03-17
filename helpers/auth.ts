export const allowBloggerRole = (session: any) =>
    session?.user?.roles?.includes("Blogger") || allowAdminOnly(session);

export const allowAdminOnly = (session: any) =>
    session?.user?.roles?.includes("Admin");
