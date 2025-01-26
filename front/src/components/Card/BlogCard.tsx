import { Card, CardHeader } from "@material-tailwind/react";

function BlogCard(props: any) {
    const { imgPath, alt } = props;
    return (
        <Card className="mt-4 p-2" placeholder={undefined}>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="relative shadow-none w-screen max-w-80 m-0"
                placeholder={undefined}
            >
                <img src={imgPath} alt={alt} />
            </CardHeader>
        </Card>
    );
}

export default BlogCard;
