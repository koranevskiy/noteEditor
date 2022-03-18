import React, {useState} from 'react';
import cl from './TagList.module.scss'
import MyButton from "../../../UI/MyButton/MyButton";
import Tag from "./Tag";
import MyInput from "../../../UI/MyInput/MyInput";
import {findTags} from "../../../../utils/findTags";

const TagList = ({tags, addTag, noteId, deleteTag}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [tagValue, setTagValue] = useState('')
    const save = () => {
        const tempTags = findTags(tagValue)
         if (tempTags?.length === 1) {
             if(tags.find(tag => tag.body === tempTags[0])){
                 setTagValue('Error: you must enter a new tag')
             }
             else{
                 addTag(noteId, tempTags[0])
                 setIsEdit(false)
                 setTagValue('')
             }

        } else if(tempTags?.length > 1) {
            setTagValue('Error: you can\'t add more than 1 tag')
        }
        else{
            setTagValue('Error: your tag must starts with "#"')
        }

    }
    return (
        <div className={cl.list}>
            {!isEdit ?

                <div className={cl.tags}>
                    {tags.map(tag =>
                        <Tag tag={tag} key={tag.id + Math.random()}
                             deleteTag={deleteTag}
                             noteId={noteId}
                        />
                    )
                    }

                </div> : <MyInput value={tagValue} onChange={(e) => setTagValue(e.target.value)}/>}

            <div className={cl.button}>
                {!isEdit ? <MyButton onClick={() => {
                        setIsEdit(true)
                    }}>Add tag</MyButton>
                    : <><MyButton onClick={() =>
                        save()
                    }>Save</MyButton><MyButton onClick={() => {
                        setTagValue('')
                        setIsEdit(false)
                    }
                    }>Back</MyButton></>}
            </div>
        </div>
    );
};

export default TagList;