import React, { FC, useContext } from 'react'
import { AppContext } from '../../App'
import { Button, message } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { IWord } from '../../@types/context'


export const Save: FC = () => {
	const { fileData, selectedWords } = useContext(AppContext)

	const handleSave:() => void = () => {
		if (!fileData || selectedWords.length === 0) {
			message.error('Select at least one word to save the file')
			return
		}

		const linesToSave: string[] = fileData.map((row, rowIndex) => {
			const selectedWordsInLine: IWord[] = row.map((word, index) => ({
					id: rowIndex * row.length + index,
					word: word,
				}))
				.filter(word =>
					selectedWords.some(selectedWord => selectedWord.id === word.id)
				)

			return selectedWordsInLine.length > 0
				? selectedWordsInLine.map(word => word.word).join('|')
				: ''
		})

		const contentToSave = linesToSave.filter(Boolean).join('\n')

		const blob = new Blob([contentToSave], { type: 'text/plain' })
		const link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)
		link.download = 'output.txt'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div>
			<Button icon={<SaveOutlined />} onClick={handleSave}>
				Save
			</Button>
		</div>
	)
}
