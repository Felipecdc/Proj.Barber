import { ReactNode } from 'react';
import styles from './styles.module.scss'

interface TitleRequest {
    title: string;
    children: ReactNode
}

export function Title({title, children}:TitleRequest){
    return(
        <div className={styles.title}>
            {children}
            <span>{title}</span>
        </div>
    )
}