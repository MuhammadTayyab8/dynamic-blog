import { NextResponse, NextRequest } from "next/server";
import { db } from '../../../../lib/db'


export async function GET(req: NextRequest) {
    try {

        const query = `SELECT * FROM BlogData`

        const [row] = await db.query(query)

        return NextResponse.json({
            success: true,
            data: row,
        })

    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: "Upload failed", error: error.message },
            { status: 500 }
        );
    }
}






export async function POST(req: NextRequest) {
    try {

        const { Title, Author, Date, ImageUrl, BlogContent, Category } = await req.json()

        // const generatedID = Date.now()

        const query = `
        INSERT INTO BlogData 
        (Title, Author, CreationDate, ThumbnailImage, Category, BlogContent)
        VALUES 
        (?, ?, ?, ?, ?, ?)
        `;
        const values = [Title, Author, Date, ImageUrl, Category, BlogContent]

        const [result] = await db.query(query, values)

        return NextResponse.json({
            success: true,
            message: `Blog Added with title ${Title}`,
        })

    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: "Upload failed", error: error.message },
            { status: 500 }
        );
    }
}





export async function PUT(req: NextRequest) {
    try {

        const { Id, Title, Author, ImageUrl, BlogContent, Category } = await req.json()

        const query = `
        UPDATE BlogData SET Title =?, Author =?, ThumbnailImage =?, Category =?, BlogContent =?
        WHERE Id = ?
        `
        const values = [Title, Author, ImageUrl, Category, BlogContent, Id]

        const [result] = await db.query(query, values)

        return NextResponse.json({
            success: true,
            message: `${Title} updated`
        })


    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: "Upload failed", error: error.message },
            { status: 500 }
        );
    }
}





export async function DELETE(req: NextRequest) {
    try {
        const {Id} = await req.json()

        const query = `
        DELETE FROM BlogData WHERE Id = ?
        `;

        const value = [Id]

        const [result] = await db.query(query, value)

        return NextResponse.json({
            success: true,
            message: `Blog Deleted`
        })


    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: "Delete failed", error: error.message },
            { status: 500 }
        );
    }
}