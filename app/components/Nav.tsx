'use client';
import { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
	IconHome2,
	IconGauge,
	IconDeviceDesktopAnalytics,
	IconFingerprint,
	IconCalendarStats,
	IconUser,
	IconSettings,
	IconMenu2,
} from '@tabler/icons-react';
import classes from './NavbarMinimal.module.css';

interface NavbarLinkProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	return (
		<Tooltip
			label={label}
			position="right"
			transitionProps={{ duration: 0 }}
		>
			<UnstyledButton
				onClick={onClick}
				className={classes.link}
				data-active={active || undefined}
			>
				<Icon
					style={{ width: rem(20), height: rem(20) }}
					stroke={1.5}
                    color='white'
				/>
			</UnstyledButton>
		</Tooltip>
	);
}

const mockdata = [
	{ icon: IconHome2, label: 'Home' },
	{ icon: IconGauge, label: 'Dashboard' },
	{ icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
	{ icon: IconCalendarStats, label: 'Releases' },
	{ icon: IconUser, label: 'Account' },
	{ icon: IconFingerprint, label: 'Security' },
	{ icon: IconSettings, label: 'Settings' },
];

export function NavbarMinimal() {
	const [active, setActive] = useState(0);
	const [collapsed, setCollapsed] = useState(false);

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<section>
			<div className={classes.topButton}>
				<IconMenu2
					onClick={() => setCollapsed((prev) => !prev)}
					style={{ cursor: 'pointer' }}
					size={30}
                    color='white'
				/>
			</div>
			<nav
				className={`${classes.navbar} ${
					collapsed ? classes.collapsed : ''
				}`}
			>
				<div
					className={`${classes.navbarMain} ${
						collapsed ? classes.hidden : ''
					}`}
				>
					<Stack justify="center" gap={0}>
						{links}
					</Stack>
				</div>
			</nav>
		</section>
	);
}
