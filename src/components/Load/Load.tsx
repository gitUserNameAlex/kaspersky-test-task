import { FC, useContext } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Papa from 'papaparse';
import { AppContext } from '../../App';
import styles from './Load.module.css'

export const Load: FC = () => {

	const { setFileData } = useContext(AppContext);

	const props = {
		name: 'file',
		action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info: any) {
			if (info.file.status !== 'uploading') {
				Papa.parse(info.file.originFileObj, {
					complete: (result: any) => {
						setFileData(result.data)
					},
					header: false,
				})
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`)
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`)
			}
		},
	}

	return (
		<div className={styles.Load}>
			<Upload {...props} accept='.csv'>
				<Button icon={<UploadOutlined />}>Load</Button>
			</Upload>
		</div>
	)
}

export default Load
