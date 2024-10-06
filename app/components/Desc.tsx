'use client';
import React from 'react';
import { Title, Text, Box } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import styles from './Desc.module.css';

const Desc: React.FC = () => {
	return (
		<div className={styles.descContainer}>
			<Title order={2} className={styles.Firsttext}>How to cut audio</Title>
			<Text className={styles.description}>
				This app can be used to trim and/or cut audio tracks, remove
				audio fragments. Fade in and fade out your music easily to make
				the audio harmonious.
				<br />
				It is fast and easy to use. You can save the audio file in any
				format (codec parameters are configured).
				<br />
				It works directly in the browser, no need to install any
				software, and is available for mobile devices.
			</Text>

			<Box className={styles.security}>
				<IconLock size={24} />
				<Text ml="xs" className={styles.secText}>Privacy and Security Guaranteed</Text>
			</Box>
			<Text className={styles.securityText}>
				This is a serverless app. Your files do not leave your device.
			</Text>
		</div>
	);
};

export default Desc;
