export interface IWord {
	word: string,
	id: number
}

export interface IAppContext {
	fileData: string[][] | null
	setFileData: React.Dispatch<React.SetStateAction<string[][] | null>>
	selectedWords: IWord[]
	setSelectedWords: React.Dispatch<React.SetStateAction<ISelectedWord[]>>
}
