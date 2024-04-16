
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { MessageCircleQuestion } from 'lucide-react';
import { CircleX } from 'lucide-react';

import { Volume2, Loader2, LoaderCircle } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useCharacterContext } from "@/app/selectedCharacterCtx";
import { useState } from "react";


export default function Chat({ result, setResult, isResponding, setIsResponding }) {
  const { character } = useCharacterContext();
  const [res, setRes] = useState('')

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
  })





  const reset = () => {
    form.reset()
    setResult('')
  }


  async function onSubmit(values) {
    let prompt = values.prompt.trim();

    if (!prompt) return;


    prompt = `you are ${character.label} and you are responding to a 8 yearold asking the following question , keep your responses brief, funny and  dont add  'naruto:' before the response or anything like that , the question is : ${prompt}`
    setResult("");
    setIsResponding(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setRes(data.res)
      const chunks = data.res.split('');
      setIsResponding(false);

      let index = 0;
      const timer = setInterval(() => {
        setResult(prevResult => prevResult + chunks[index]);


        index++;
        if (index === chunks.length - 1) {
          clearInterval(timer);

        }
      }, 30);
    } catch (error) {
      console.error('Error:', error);
      setIsResponding(false);
    }
  }




  const handlePlay = async () => {
    console.log('requesting audio')

    console.log(res)
    console.log(character.value)

    try {
      const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "giminiresponse": res, "voiceactor": character.value }),
      });


      const data = await response.blob();
      const audioElement = document.createElement('audio');
      audioElement.src = URL.createObjectURL(data);
      audioElement.play();
      audioElement.addEventListener('ended', () => {
        URL.revokeObjectURL(audioElement.src); // Revoke URL after playback
      });

    } catch (e) {
      console.log("error fetching audio : ", e)
    }
  }
  return (
    <div className="  flex justify-between  rounded-3xl py-7 pr-3   h-[950px] w-[800px] flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex font-bold text-3xl justify-start gap-2 text-electro  items-center lemonada"> <MessageCircleQuestion /> Ask A Question!</div>
        {isResponding &&
          <div className="h-[800px] w-full flex   justify-center items-center">
            <Loader2 strokeWidth={0.75} color="#ffffff" absoluteStrokeWidth className="h-44 w-44 animate-spin" />

          </div>
        }
        {result != "" && <div className="flex text-white text-xl items-start gap-2">
          <div onClick={handlePlay}><Volume2 className='mt-2 hover:cursor-pointer' size={24} strokeWidth={1.5} absoluteStrokeWidth /></div>

          <div className="transition-all overflow-scroll p-2">{result}</div>
        </div>
        }
      </div>

      <div className="flex flex-row items-center justify-between gap-2">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem >

                  <FormControl >
                    <Input className=" bg-white w-full rounded-lg items text-black hover:cursor-pointer " disabled={isResponding} placeholder='Type your question...' {...field}></Input>

                  </FormControl>


                </FormItem>
              )}
            />
          </form>
        </Form>
        <CircleX className="hover:cursor-pointer" onClick={reset} size={42} strokeWidth={1.5} absoluteStrokeWidth />

      </div>
    </div>
  )
}