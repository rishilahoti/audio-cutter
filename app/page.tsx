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
				setShowStickyNav(!entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1,
			}
		);

		const currentRef = secondScreenRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
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
			

			<div id="firstScreen" className={`${styles.nav} ${showStickyNav ? styles.sticky : ''}`}>
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