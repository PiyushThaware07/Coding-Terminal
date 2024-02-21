import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react';
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "./constants";
import Results from './Results'

export default function Terminal() {
    const [value, setValue] = useState('');
    // Selected language
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    // Focus Editor on mount
    const editorRef = useRef();
    function onMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    // Languages loop
    const languages = Object.entries(LANGUAGE_VERSIONS);

    // Handle selected language
    function handleSelectedLanguage(event) {
        console.warn("Language Selected : ", event.target.value);
        setSelectedLanguage(event.target.value);
        console.log("set the code snippet as per the language");
        setValue(CODE_SNIPPETS[event.target.value])
        console.log("value : ", value);
    }

    return (
        <div className='grid grid-cols-2 h-screen w-screen overflow-hidden bg-black'>
            <div className="terminal h-full w-full">
                <div className='h-full w-full'>
                    <select className='capitalize text-sm font-semibold px-5 py-2 bg-green-500 focus:outline-none' value={selectedLanguage} onChange={handleSelectedLanguage}>
                        {languages.map(([language, version]) => (
                            <option className='bg-white text-black font-semibold' key={language} value={language}>{language} {version}</option>
                        ))}
                    </select>
                    <Editor
                        className='h-screen w-full'
                        language={selectedLanguage}
                        defaultValue={CODE_SNIPPETS[selectedLanguage]}
                        value={value}
                        theme='vs-dark'
                        onChange={() => setValue(value)}
                        onMount={onMount}
                    />;
                </div>
            </div>
            <div className="results h-full w-full">
                <Results editorRef={editorRef} language={selectedLanguage} />
            </div>
        </div>
    )
}





