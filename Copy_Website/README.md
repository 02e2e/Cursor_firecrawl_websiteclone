# Firecrawl UI Clone

A clone of the UI from [REDACTED URL] using Next.js.

## Requirements

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Dependencies

This project uses the following main dependencies:
- Next.js (^15.2.2)
- React (^18.2.0)
- React DOM (^18.2.0)
- Axios (^1.4.0)
- Puppeteer (^24.4.0)
- dotenv (^16.4.7)
- prompts (for interactive CLI)

## Development

1. Create a `.env` file with the following variables:
   ```
   FIRECRAWL_API_KEY=your_firecrawl_api_key
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. To scrape the website:
   ```bash
   node src/scripts/scrape.js
   ```
   You will be prompted to enter your USER ID and password.

## API Access
The API URL is not included in this repository for security reasons. Please contact the repository owner to request access.

## Features
- Feature 1
- Feature 2
- Feature 3

## Technologies Used
- Next.js
- React
- [Other technologies]

## License
[Your license information] 