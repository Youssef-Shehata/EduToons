"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(30).optional(),
  // topics: new z.ZodArray().optional(),
  video: z.custom((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
  character: z.string()
})

export default function UploadButton({ size }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const { toast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  let userId = undefined
  if (isLoaded && isSignedIn) {
    userId = user.id
  }
  const generateUploadUrl = useMutation(api.videos.generateUploadUrl);
  const createVid = useMutation(api.videos.createVideo)


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      video: undefined,
      character: ''

      // topics: [],

    },
  })
  const fileRef = form.register("video")

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "video/mp4" },
      body: values.video[0],
    });
    const { storageId } = await result.json();



    try {
      await createVid({
        storageId: storageId,
        userId: userId,
        title: values.title,
        description: values.description,
        character: "teacher"
      }).then(async () => {
        try {
          fetch('localhost:3002/api/video', {
            method: "POST",
            headers: { "Content-Type": "video/mp4" },
            body: values.video[0],
          }).then((res) => {
            toast({
              variant: "success",
              title: "File Uploaded",
              description: values.title,
            })
            const { result } = res.json();
            console.log(result)
          });


        } catch (e) {
          console.log('error uploading to server ')
        }


      });
      form.reset();
      setDialogOpen(false);
    } catch (e) {
      setDialogOpen(false)
      form.reset();
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `couldnt upload ${values.title}`
      })
    }



  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(dialogOpen) => {
      setDialogOpen(dialogOpen)
      form.reset();
    }}>
      <DialogTrigger asChild>
        <Button variant="default" size={size}>Upload Vid </Button>
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



                <Button
                  disabled={form.formState.isSubmitting}
                  className="justify-self-end flex gap-1 "
                  type="submit"
                  variant="secondary"
                >
                  Submit
                  {form.formState.isSubmitting &&
                    <Loader2 className="mr-2 h-4 animate-spin" />}
                </Button>
              </form>
            </Form>

            <div >Upload a max of 125 mg video with minimum noise in the background.
              Make sure the camera is stable and your smile is clear and visible!
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
