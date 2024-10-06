import '@mantine/core/styles.css';
import './globals.css'
import { ColorSchemeScript, MantineProvider} from '@mantine/core';
import { NavbarMinimal } from './components/Nav';

export const metadata = {
	title: 'My Mantine app',
	description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<div>
						<NavbarMinimal />
						<div>{children}</div>
					</div>
				</MantineProvider>
			</body>
		</html>
	);
}
