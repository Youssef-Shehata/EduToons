"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(1).max(10),
  description: z.string().min(1).max(30).optional(),
  // topics: new z.ZodArray().optional(),
  video: z.custom((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),

})


export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser()
  let videos = []
  let userId = undefined
  if (isLoaded && isSignedIn) {
    // console.log(user)
    userId = user.id
  }
  videos = useQuery(api.videos.listVideos, { "userId": userId })
  const generateUploadUrl = useMutation(api.videos.generateUploadUrl);
  const createVid = useMutation(api.videos.createVideo)







  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      video: undefined,

      // topics: [],

    },
  })
  const fileRef = form.register("video")

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.video[0])
    console.log(values)

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "video/mp4" },
      body: values.video[0],
    });

    const { storageId } = await result.json();



    await createVid({
      storageId: storageId,
      userId: userId,
      title: values.title,
      description: values.description,
    });

  }

  return (
    <main className="container mx-auto pt-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="text-rxl font-bold text-3xl">Your Videos </h1>
        <Dialog >
          <DialogTrigger asChild>
            <Button variant="secondary"  >Upload Vid </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Share Your Knowledge!</DialogTitle>
              <DialogDescription className="pt-6">

                <Form {...form} >
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-3 flex flex-col justify-start ">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Title" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Video Description" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="topics"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Topics" {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
 */}


                    <FormField
                      control={form.control}
                      name="video"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <Input type="file"
                              placeholder="Upload video "
                              {...fileRef}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />



                    <Button className="justify-self-end" type="submit" variant="secondary">Submit</Button>
                  </form>
                </Form>

                <div >Upload a max of 125 mg video with minimum noise in the background.
                  Make sure the camera is stable and your smile is clear and visible!
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>



      </div>
      {videos?.map((vid) => {
        return <div key={vid.id}> {vid.title} </div>
      })}

    </main>
  );
}
