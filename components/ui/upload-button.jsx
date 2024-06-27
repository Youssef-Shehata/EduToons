"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useUserContext } from "@/app/currentUserCtx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

import { v4 as uuidv4 } from 'uuid';
import { join } from "path"


export default function UploadButton({ size }) {
  const { toast } = useToast()
  const { user } = useUserContext()
  const [dialogOpen, setDialogOpen] = useState(false)
  let userId = user.id



  const form = useForm({
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

    if (!values.video[0].type.startsWith('video/')) {
      form.setError('video', { type: 'manual', message: 'Invalid video file type' });
      return
    }


    //CHANGE URL WHEN RUNNING ON WINDOWS
    const id = uuidv4().toString()
    const fileName = `${id}.mp4`

    let url = join('/videos/', fileName)

    const VideoData = {
      "url": url,
      "fileName": fileName,
      "userId": userId,
      "title": values.title,
      "description": values.description
    }


    try {
      const formData = new FormData();
      formData.set('video', values.video[0]);
      formData.set('videoData', JSON.stringify(VideoData)); // Add any additional data as needed

      const response = await fetch('/api/video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      // const uploadResponse = await fetch('http://localhost:8000/api', {
      //   method: 'POST',
      //   body: formData,
      // })


      // if (!uploadResponse.ok) {
      //   throw new Error("Failed to upload video");
      // }

      toast({
        variant: "success",
        title: "File Uploaded",
        description: values.title,
      });



    } catch (e) {
      console.error("Error uploading video:", e);

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `couldnt upload ${values.title}`
      })
    } finally {
      form.reset();
      setDialogOpen(false);
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(dialogOpen) => {
        setDialogOpen(dialogOpen)
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          size={size}
        >
          Upload Vid
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Share Your Knowledge!</DialogTitle>
          <DialogDescription className="pt-6">

            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 pb-3 flex flex-col justify-start ">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title" {...field}
                          required
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
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="video"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input type="file"
                          placeholder="Upload video "
                          {...fileRef}
                          required
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
