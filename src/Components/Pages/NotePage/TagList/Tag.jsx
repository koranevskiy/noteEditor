import React from 'react';
import cl from "./TagList.module.scss";

const Tag = ({tag, deleteTag, noteId}) => {
    return (
        <div key={tag.id} className={cl.item}>
                    <span className={cl.tag} onClick={() => {
                        deleteTag(noteId,tag.id)
                    }}>
                        {tag.body}
                    </span>
        </div>
    );
};

export default Tag;