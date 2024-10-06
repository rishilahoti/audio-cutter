'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Desc from './components/Desc';
import AudioCutter from './components/AudioCutter';

export default function HomePage() {
	const [showStickyNav, setShowStickyNav] = useState(false);
	const secondScreenRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setShowStickyNav(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1,
			}
		);

		if (secondScreenRef.current) {
			observer.observe(secondScreenRef.current);
		}

		return () => {
			if (secondScreenRef.current) {
				observer.unobserve(secondScreenRef.current);
			}
		};
	}, []);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className={styles.page}>
			<div id="firstScreen">
				<AudioCutter onNavClick={scrollToSection} />
			</div>
			<div
				id="secondScreen"
				ref={secondScreenRef}
				className={styles.secondScreen}
			>
				<Desc />
			</div>
		</div>
	);
}
