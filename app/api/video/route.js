'use server'
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(req) {
  const data = await req.formData()
  let file = data.get('video')
  let videoData = JSON.parse(data.get('videoData'))

  if (!file || !videoData) return NextResponse.json({ success: false })


  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  //db 

  const path = join(process.cwd(), '/public/videos', videoData.fileName)
  await writeFile(path, buffer)

  return NextResponse.json({ success: true })

}