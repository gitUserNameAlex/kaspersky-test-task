import { FC, useContext } from 'react'
import { AppContext } from '../../App'
import { IWord } from '../../@types/context'


export const FileContent: FC = () => {

	const { fileData, selectedWords, setSelectedWords } = useContext(AppContext)

	const handleWordClick = (word: IWord) => {
		setSelectedWords(prevSelectedWords => prevSelectedWords.some(selectedWord => selectedWord.id === word.id)
				? prevSelectedWords.filter(selectedWord => selectedWord.id !== word.id)
				: [...prevSelectedWords, word]
		    )
	}

	return (
		<div>
			{fileData && (
				<div>
					{fileData.map((row, rowIndex) => (
						<div key={rowIndex}>
							{row.map((word, index) => {
								const wordObj: IWord = {
									id: rowIndex * row.length + index,
									word: word,
								}
								return (
									<span
										key={index}
										style={{
											cursor: 'pointer',
											color: selectedWords.some(selectedWord => selectedWord.id === wordObj.id) ? 'red' : 'black',
										}}
										onClick={() => handleWordClick(wordObj)}>

										{word}
									</span>
								)
							})}
							<br />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
