import BlogPost from "./BlogPost";
import Media from "./Media";
import User from "./User";
import Image from "./Image";

BlogPost.createdBy = BlogPost.belongsTo(User, {
    as: "createdBy",
    foreignKey: "createdById",
});
User.Posts = User.hasMany(BlogPost, {
    foreignKey: { allowNull: false, name: "createdById" },
});

Media.createdBy = Media.belongsTo(User, {
    as: "createdBy",
    foreignKey: "createdById",
});
User.Media = User.hasMany(Media, {
    foreignKey: { allowNull: false, name: "createdById" },
});

Image.uploadedBy = Image.belongsTo(User, {
    as: "uploadedBy",
    foreignKey: "uploadedById",
});

export { User, BlogPost, Image };
