import React, { FC, createContext, useState } from 'react';
import { IAppContext, IWord } from './@types/context';
import { Load } from './components/Load/Load';
import { Save } from './components/Save/Save';
import { FileContent } from './components/FileContent/FileContent';
import styles from './App.module.css'
import { ReactComponent as KasperskyLogo } from './assets/kaspersky.svg';


const defaultContext = {
	fileData: null,
	selectedWords: [],
	setSelectedWords: () => {},
	setFileData: () => {},
}


export const AppContext = createContext<IAppContext>(defaultContext)

export const App: FC = () => {
  	const [fileData, setFileData] = useState<string[][] | null>(null)
		const [selectedWords, setSelectedWords] = useState<IWord[]>([])

  return (
		<div className={styles.App}>
			<AppContext.Provider
				value={{ fileData, setFileData, selectedWords, setSelectedWords }}
			>
				<KasperskyLogo />
				<Load />
				<Save />
				<FileContent />
			</AppContext.Provider>
		</div>
	)
}