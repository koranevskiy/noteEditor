import React, {useMemo, useState} from 'react';
import Note from "./Note";
import cl from './Notes.module.scss'
import MyInput from "../../UI/MyInput/MyInput";
import MyTextArea from "../../UI/MyTextArea/MyTextArea";
import MyButton from "../../UI/MyButton/MyButton";
import {findTags} from "../../../utils/findTags";
import {createId} from "../../../utils/createId";

const Notes = ({data}) => {
    const [notes, setNotes] = useState(data)
    const [newNotice, setNewNotice] = useState('')
    const [query, setQuery] = useState('')
    const addTag = (id, tag) => {
        if (Array.isArray(tag)) {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {
                    ...note,
                    tags: [...note.tags, tag.map(item => ({id: createId, body: item}))]
                }
            }))
        } else {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {...note, tags: [...note.tags, {id: createId(), body: tag}]}
            }))
        }
    }
    const deleteTag = (id, tagId) => {
        setNotes(notes.map(note => {
            return id !== note.id ? note : {...note, tags: [...note.tags.filter(tag => tagId !== tag.id)]}
        }))
    }
    const addNote = () => {
        const tagsBodies = findTags(newNotice)
        let tagArrayObjects = []
        if (tagsBodies) {
            tagArrayObjects = tagsBodies.map(tag => ({id: createId, body: tag}))
        }
        const note = {id: createId(), description: newNotice, tags: tagArrayObjects}
        setNotes([...notes, note])
        setNewNotice('')
    }
    const searchNotes = useMemo(() => {
        let searchArray = notes
        const tags = findTags(query)
        if (tags) {
            let tagsQr = tags.sort().join('')
            searchArray = notes.filter(note => {
                let noteQr = note.tags.map(tag => tag.body).sort().join('')
                return noteQr.includes(tagsQr)
            })
        }
        return searchArray
    }, [query, notes])
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }
    const editNote = (id, description, tags) => {
        if (Array.isArray(tags)) {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {
                    id,
                    description,
                    tags: tags.map(tag => ({id: createId(), body: tag}))
                }
            }))
        } else {
            setNotes(notes.map(note => {
                return id !== note.id ? note : {id, description, tags: [...note.tags]}
            }))
        }

    }

    return (
        <div className={cl.notes}>
            <div className={cl.newNote}>
                <MyTextArea placeholder="new note"
                            onChange={(e) => setNewNotice(e.target.value)}
                            value={newNotice}/>
                <MyButton onClick={() => addNote()}>Create note</MyButton>
            </div>
            <hr/>
            <div className={cl.filter}>
                <MyInput placeholder="search by tags"
                         onChange={(e) => setQuery(e.target.value)}
                         value={query}/>
            </div>
            <hr/>
            {searchNotes.map(note =>
                <Note {...note} key={note.id}
                      tagList={note.tags}
                      editNote={editNote}
                      deleteNote={deleteNote}
                      addTag={addTag}
                      deleteTag={deleteTag}
                />
            )}
        </div>
    );
};

export default Notes;