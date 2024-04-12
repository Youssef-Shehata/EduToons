
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { MessageCircleQuestion } from 'lucide-react';
import { CircleX } from 'lucide-react';

import { Volume2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useState, useEffect } from "react";


export default function Chat() {

  const [isResponding, setIsResponding] = useState(false)
  const [result, setResult] = useState('')
  const [prompt, setPrompt] = useState('')

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
  })



  //simulate delay 
  useEffect(() => {

    const timer = setTimeout(() => {
      setResult(prompt)
      setIsResponding(false)
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [isResponding]);




  const reset = () => {
    form.reset()
  }
  async function onSubmit(values) {

    const prompt = values.prompt
    if (!prompt || prompt == '') return
    setPrompt('')
    setResult("")
    setIsResponding(true)
    // callAPI
    // setResult(res)
    // setIsResponding(false)



  }
  return (
    <div className="absolute right-3 justify-between  top-24 bg-slate-600 rounded-3xl py-7 px-5 h-[720px] w-96 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex font-bold text-3xl justify-start gap-2 text-electro  items-center lemonada"> <MessageCircleQuestion /> Ask A Question!</div>
        {result != '' && <div className="flex text-white text-xl items-center gap-2"> <Volume2 className='hover:cursor-pointer' size={24} strokeWidth={1.5} absoluteStrokeWidth />{result}</div>
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