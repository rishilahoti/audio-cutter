'use client';
import React, { useState, useRef } from 'react';
import {
	Container,
	Title,
	Text,
	Button,
	Box,
	Slider,
	Group,
	Modal,
	Select,
} from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import styles from './AudioCutter.module.css';

interface AudioCutterProps {
	onNavClick: (id: string) => void;
}

const AudioCutter: React.FC<AudioCutterProps> = ({ onNavClick }) => {
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [isCutting, setIsCutting] = useState(false);
	const [cutRange, setCutRange] = useState<[number, number]>([0, 100]);
	const waveSurferRef = useRef<WaveSurfer | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [format, setFormat] = useState('mp3'); // Added format state

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setAudioFile(file);
			loadWaveform(file);
			setModalOpen(true);
		}
	};

	const loadWaveform = (file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const audioData = e.target?.result as string;
			if (!waveSurferRef.current) {
				waveSurferRef.current = WaveSurfer.create({
					container: '#waveform',
					waveColor: '#00ff66',
					progressColor: '#665dc3',
				});
			}
			waveSurferRef.current.load(audioData);
		};
		reader.readAsDataURL(file);
	};

	const handleCutAudio = () => {
		if (!waveSurferRef.current) return;

		const duration = waveSurferRef.current.getDuration();
		const [start, end] = cutRange.map((val) => val / 100); // convert percentage to decimal

		waveSurferRef.current.seekTo(start);
		waveSurferRef.current.play();

		setTimeout(() => {
			waveSurferRef.current?.pause();
		}, (end - start) * duration * 1000);
	};

	return (
		<Container className={styles.container}>
			<Box className={styles.title}>
				<a
					onClick={() => onNavClick('secondScreen')}
					className={styles.navLink}
				>
					HOW IT WORKS
				</a>
				<a className={styles.navLink}>JOINER</a>
			</Box>

			<Title order={1} className={styles.audioText} mb="md">
				Audio Cutter
			</Title>
			<Text className={styles.descText} mb="md">
				Free editor to trim and cut any audio file online
			</Text>

			<input
				type="file"
				accept=".wav,.mp3,.aac,.ogg,.wma,.flac,.alac,.aiff,audio/*"
				hidden
				onChange={handleFileChange}
			/>
			<Button
				className={styles.upload}
				onClick={() =>
					(
						document.querySelector(
							'input[type="file"]'
						) as HTMLInputElement
					)?.click()
				}
			>
				Browse my files
			</Button>

			<Modal
				opened={modalOpen}
				onClose={() => setModalOpen(false)}
				title="Audio Preview"
				centered
				size="xl"
				classNames={{ modal: styles.modal }}
			>
				<div id="waveform" className={styles.waveform}></div>

				<Group mt="md" className={styles.controlGroup}>
					<Text>Trim Start:</Text>
					<Slider
						value={cutRange[0]}
						min={0}
						max={100}
						onChange={(val) => setCutRange([val, cutRange[1]])}
					/>
					<Text>Trim End:</Text>
					<Slider
						value={cutRange[1]}
						min={0}
						max={100}
						onChange={(val) => setCutRange([cutRange[0], val])}
					/>
				</Group>

				<Group mt="md" className={styles.buttonGroup}>
					<Button onClick={handleCutAudio}>Cut</Button>
					<Button color="red" onClick={() => setAudioFile(null)}>
						Remove
					</Button>
				</Group>

				<Group mt="md" className={styles.footerGroup}>
					<Select
						value={format}
						onChange={(value) => setFormat(value || 'mp3')}
						data={['mp3', 'wav', 'ogg']}
						label="Format"
						className={styles.formatSelect}
					/>
					<Button>Save</Button>
				</Group>
			</Modal>
		</Container>
	);
};

export default AudioCutter;
