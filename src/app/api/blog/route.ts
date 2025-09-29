import { NextResponse, NextRequest } from "next/server";
import { db } from '../../../../lib/db'


export async function GET(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url);
        // Get query parameters for pagination and filtering
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = (page - 1) * limit;

        let whereClause = 'WHERE 1 = 1'
        let values = [];

        const categories = searchParams.get("categories");
        // e.g. "Education,Technology"
        const categoryList = categories?.split(",") || [];

        if (categoryList.length > 0) {
            // add multiple FIND_IN_SET
            const conditions = categoryList.map(() => `FIND_IN_SET(?, Category) > 0`).join(" OR ");
            whereClause += ` AND (${conditions})`;
            values.push(...categoryList);
        }

        if (searchParams.get("Id")) {
            whereClause += ' AND Id = ?'
            values.push(searchParams.get("Id"))
        }


        const query = `SELECT * FROM BlogData
            ${whereClause}
        ${limit > 0 ? "LIMIT ? OFFSET ?" : ""}

        `

        const [row] = await db.query(query, [...values, limit, offset])

        // 2) Count query (total rows without limit/offset)
        const countQuery = `
        SELECT COUNT(*) as count FROM BlogData
        ${whereClause}
        `
        // const [countResult] = await db.query("SELECT COUNT(*) as count FROM BlogData");
        const [countResult] = await db.query(countQuery, values);
        const totalRecords = countResult[0].count;

        console.log(totalRecords, "totalRecords")
        let totalPages = Math.ceil(totalRecords / limit);


        return NextResponse.json({
            success: true,
            data: row,
            pagination: {
                currentPage: page,
                totalPages,
                totalRecords,
                perPage: limit,
            },
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
        const { Id } = await req.json()

        console.log(Id, "Id")

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