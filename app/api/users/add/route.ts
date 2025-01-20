import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST (request: NextRequest) {
    try {
        const body = await request.json()
        const {name, email, id, password} = body

        const hash = await bcrypt.hash(password,12);
        await prisma.user.create({
            data: {
                name, email, id, username: id, password:hash
            }
        })

        return NextResponse.json({status: 200, message: "Berhasil Menambahkan Pengguna!"})
    } catch (err) {
        return NextResponse.json({status: 500, message: err instanceof Error ? err.message : "Unknown Error!"})
    }
}