import React, { useState } from 'react'
import { executeCode } from './api';
// & ICONS
import { PiCircleNotchBold } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";


export default function Results({ editorRef, language }) {
    const [output, setOutput] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    console.log(editorRef, language);
    async function RunCode() {
        // return the content of editor
        const sourceCode = editorRef.current.getValue();
        console.log(sourceCode);
        if (!sourceCode) { return }
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"))
        }
        catch (error) {
            console.log("ERROR :", error);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='h-full p-5 bg-slate-950'>
            <button type='button' isLoading={isLoading} className='flex flex-nowrap items-center gap-1 bg-green-500 text-white px-5 py-2 font-semibold text-sm rounded-md' onClick={RunCode}>
                <h1>Run Code</h1>
                {isLoading ? <PiCircleNotchBold className='text-lg animate-spin' /> : <FaPlay/>}
            </button>
            <br />
            <div className="bg-slate-800 h-full p-5 rounded-lg">
                {
                    output ?
                        output.map((line, index) => (
                            <div className="text-white font-semibold" key={index}>
                                {line}
                            </div>
                        ))
                        :
                        <div className="">
                            <h1 className='text-white'>Click run to see output here...</h1>
                        </div>
                }
            </div>

            {/* <textarea readOnly value={output} placeholder='Output' className='mt-8 text-white font-semibold min-h-[200px] h-full w-full bg-slate-800 rounded-md focus:outline-none p-5'>dddd</textarea> */}
        </div>
    )
}
