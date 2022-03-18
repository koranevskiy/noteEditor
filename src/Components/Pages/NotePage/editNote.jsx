import React, {useMemo, useState} from 'react';
import cl from './editNote.module.scss'
import MyButton from "../../UI/MyButton/MyButton";
import {findTags} from "../../../utils/findTags";
import {HighlightWithinTextarea} from 'react-highlight-within-textarea'

const EditNote = ({id, description, cancel, edit, tagList, addTag}) => {
    const [text, setText] = useState(description)
    const onChange = (text) => setText(text)
    const editDescription = () => {
        const tempTags = findTags(text)
        let noRepeatArray = []

        if (tempTags) {
            tagList.forEach(({body}) => {
                noRepeatArray.push(body)
            })
            noRepeatArray = Array.from(new Set([...noRepeatArray, ...tempTags]))
            addTag(id, noRepeatArray)
            edit(id, text, noRepeatArray)
        } else {
            edit(id, text)
        }
    }
    const highlightTemplate = useMemo(() => {
        let tags = findTags(text)

        let regex = '/'
        tagList.forEach(({body}) => {
            let tagString = body.slice(1)
            regex += tagString + '|'
        })
        regex = regex.slice(0, regex.length)
        regex = regex + '/'
        return new RegExp(regex, 'gi')

    }, [tagList])
    return (
        <div className={cl.editNote}>
            <div className={cl.body}>
                <div className={cl.textArea}>
                    <HighlightWithinTextarea placeholder='description' value={text}
                                             onChange={onChange}
                                             highlight={highlightTemplate}

                    />
                </div>
            </div>
            <div className={cl.buttons}>
                <MyButton onClick={() => {
                    editDescription()
                    cancel(false)
                }}>Save</MyButton>
                <MyButton onClick={() => {
                    cancel(false)
                }}>Cancel</MyButton>
            </div>
        </div>
    );
};

export default EditNote;