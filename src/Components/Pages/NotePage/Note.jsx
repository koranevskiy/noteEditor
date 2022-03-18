import React, {useState} from 'react';
import cl from './Note.module.scss'
import MyButton from "../../UI/MyButton/MyButton";
import EditNote from "./editNote";
import TagList from "./TagList/TagList";

const Note = ({id, description, tagList, deleteNote, editNote, addTag, deleteTag}) => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className={cl.noteOuterWrapper}>
            {!isEdit && <div className={cl.noteInnerWrapper}>
                <div className={cl.note}>
                    <div className={cl.noteBody}>

                        <div className={cl.noteDescription}>
                            {description}
                        </div>
                    </div>
                </div>
                <div className={cl.noteButtons}>
                    <div className={cl.btnDefault}><MyButton onClick={() => {
                        setIsEdit(true)
                    }}>Edit</MyButton>
                        <MyButton onClick={() => {
                            deleteNote(id)
                        }}>Delete</MyButton></div>
                </div>
            </div>}
            {isEdit && <EditNote cancel={setIsEdit}
                id={id} description={description} edit={editNote} tagList={tagList} addTag={addTag}/>}
            <hr/>
            <TagList tags={tagList} addTag={addTag} noteId={id} deleteTag={deleteTag}/>
        </div>
    );
};

export default Note;