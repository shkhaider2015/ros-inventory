"use client"
import React from "react";
import styles from "./styles.module.css" ;
import { Element } from "react-scroll";


const ElementHead:React.FC<IElementHead> = ({name, text}) => {
    return <Element name={name} className={styles.container} >
        {text}
    </Element>
}

interface IElementHead {
    name: string;
    text: string;
}

export default ElementHead;