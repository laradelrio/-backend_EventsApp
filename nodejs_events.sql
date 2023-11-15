-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2023 at 09:10 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_events`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id_event` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `address` text NOT NULL,
  `longitude` decimal(40,38) NOT NULL,
  `latitude` decimal(40,38) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id_event`, `name`, `user_id`, `category`, `description`, `date`, `time`, `address`, `longitude`, `latitude`, `image`, `created_at`, `updated_at`) VALUES
(67, 'Game Night', 1, 'Sport', 'Fun evening with your local gamer community!', '2023-11-10', '20:00:00', 'Plaça De La Verneda, 08020 Barcelona, Barcelona, Spain', 2.19999261545048000000000000000000000000, 41.42388382125330000000000000000000000000, 'https://i.ibb.co/5RVbmzh/game-night.jpg', '2023-11-05 15:31:15', '2023-11-08 13:00:52'),
(68, 'High-Energy Hoops Showdown: [Team A] vs. [Team B]', 1, 'Sport', 'Get ready for an electrifying basketball showdown as [Team A] takes on [Team B] in a high-stakes match that promises fast-paced action, jaw-dropping dunks, and thrilling plays that will keep you on the edge of your seat.\n\nDate: [Specify the date]\nTime: [Specify the time]\nLocation: [Specify the venue]\n\nDescription:\n\nJoin us at [Venue Name] as two of the most formidable basketball teams go head-to-head in a battle of skill, strategy, and sheer athleticism. This is not just a game; it\'s an unforgettable sporting spectacle that brings the excitement of professional basketball right to your doorstep.\n\nEvent Highlights:\n\nTop-Notch Talent: Watch as the best athletes from [Team A] and [Team B] showcase their skills, from three-pointers to slam dunks, and everything in between.\n\nIntense Competition: Feel the intensity of the game as these teams compete for victory, leaving it all on the court.\n\nFan Engagement: Enjoy an incredible atmosphere with passionate fans, halftime shows, and fan engagement activities that will keep you entertained throughout the game.\n\nConcessions: Satisfy your cravings with delicious stadium snacks and refreshments available at the venue.\n\nMerchandise: Support your favorite team by purchasing official merchandise, from jerseys to souvenirs.\n\nHalf-Court Challenges: Get a chance to participate in half-court challenges during breaks, and win exciting prizes.\n\nWhether you\'re a die-hard basketball fan, a casual observer, or simply looking for a thrilling evening of sports and entertainment, this game is not to be missed. Grab your tickets and witness the excitement of High-Energy Hoops Showdown as [Team A] and [Team B] battle it out on the court. It\'s a night of basketball magic that you\'ll remember for years to come. Get your tickets now and be a part of the action!', '2023-11-08', '12:30:00', 'Plaça De Les Glòries, 08018 Barcelona, Barcelona, Spain', 2.18883270000000000000000000000000000000, 41.40467090000000000000000000000000000000, 'https://i.ibb.co/D7WPPs6/basket.jpg', '2023-11-05 15:49:57', '2023-11-08 09:55:27'),
(69, 'Harmony in Motion: Yoga & Mindfulness Retreat', 1, 'Well Being', 'Unplug from the hustle and bustle of daily life and connect with your inner self in the serene surroundings of our beautiful retreat center. \"Harmony in Motion\" is designed to rejuvenate your mind, body, and spirit through a carefully curated blend of yoga, mindfulness, and meditation practices.\n\nEvent Highlights:\n\nYoga Sessions: Immerse yourself in daily yoga classes led by experienced instructors. Whether you\'re a beginner or an experienced yogi, our classes cater to all levels, focusing on alignment, strength, and flexibility.\n\nMeditation Workshops: Learn the art of meditation and mindfulness to quiet the mind, reduce stress, and promote mental clarity. Our guided sessions will help you find peace within.\n\nNature Walks: Explore the natural beauty surrounding the retreat center with guided nature walks. Connect with the environment and embrace the healing power of nature.\n\nHealthy Cuisine: Enjoy delicious, nourishing meals prepared with locally sourced, organic ingredients. Our meals are designed to support your yoga practice and overall well-being.\n\nCommunity and Connection: Build meaningful connections with fellow participants who share your passion for yoga and mindfulness. Engage in group discussions and activities that foster a sense of community.\n\nRelaxation Time: Take time to unwind with leisurely activities, including spa treatments, free time, and relaxation by the pool.\n\nWorkshops: Dive deeper into yoga philosophy and wellness practices through insightful workshops led by experts.\n\nBonfire and Music: Gather around a bonfire in the evenings for music, storytelling, and a sense of togetherness.\n\nJoin us at \"Harmony in Motion\" to align your mind, body, and spirit, and leave feeling refreshed, inspired, and ready to embrace life with a newfound sense of balance and serenity. This retreat is suitable for all levels, so whether you\'re a seasoned yogi or just starting your journey, you\'re welcome to join us.\n\nReserve your spot today and embark on a transformative journey towards holistic well-being. We look forward to sharing this experience with you. Namaste!', '2023-11-26', '10:00:00', 'Carretera De L\'església 92, 08017 Barcelona, Barcelona, Spain', 2.10087000000000000000000000000000000000, 41.41884300000000000000000000000000000000, 'https://i.ibb.co/0sp3SpF/yoga.jpg', '2023-11-05 16:03:00', '2023-11-05 16:03:00'),
(70, 'Business Innovators Summit 2023: Igniting Growth and Transformation', 1, 'Career/Business', 'The \"Business Innovators Summit\" is the ultimate platform for forward-thinkers and business enthusiasts looking to gain a competitive edge, network with top professionals, and unlock opportunities for growth and transformation. Whether you\'re an established business owner, an aspiring entrepreneur, or simply someone eager to dive into the business world, this event is designed for you.\n\nEvent Highlights:\n\nKeynote Speakers: Learn from the best in the business world as renowned thought leaders and successful entrepreneurs share their strategies and stories of triumph.\n\nPanel Discussions: Engage in dynamic discussions with industry experts on topics ranging from digital transformation and sustainable business practices to leadership and innovation.\n\nNetworking Opportunities: Connect with like-minded individuals, potential collaborators, and mentors. Build invaluable relationships that could shape the future of your business.\n\nWorkshops: Participate in hands-on workshops where you can develop new skills, refine your business strategies, and discover the tools and technologies driving business success.\n\nExhibition Area: Explore a wide array of products and services offered by innovative businesses. Discover cutting-edge solutions and opportunities to enhance your own business.\n\nInvestor Pitches: Watch startups and emerging businesses pitch their ideas to a panel of investors. Witness the birth of future success stories.\n\nEvening Gala: Wrap up the summit with an unforgettable evening of networking, fine dining, and entertainment. Celebrate your achievements and forge new connections in style.\n\nJoin us at the \"Business Innovators Summit 2023\" to gain fresh perspectives, discover the latest industry trends, and seize opportunities that can drive your business to new heights. Be part of a community that values innovation, growth, and transformation. Secure your spot today and take a step toward a future of business excellence. Your success story begins here!', '2023-11-07', '09:38:00', 'Avinguda De La Reina Maria Cristina, 08004 Barcelona, Barcelona, Spain', 2.14992751455110000000000000000000000000, 41.37230600036560000000000000000000000000, 'https://i.ibb.co/V3R4Lxz/business.jpg', '2023-11-05 16:05:41', '2023-11-05 16:05:41'),
(95, 'Artistry Unveiled: A Creative Exploration', 9, 'Culture', '\"Artistry Unveiled\" is a canvas where art takes center stage, where strokes of creativity merge with boundless imagination. Whether you\'re a seasoned artist, a budding creative, or simply someone who appreciates the beauty of artistic endeavors, this event invites you to explore, connect, and be inspired.\n\nEvent Highlights:\n\nArt Gallery: Immerse yourself in a diverse array of artworks, from paintings and sculptures to digital art and photography. Witness the world through the eyes of talented artists.\n\nArtist Workshops: Participate in hands-on workshops led by renowned artists. Learn new techniques, experiment with different mediums, and bring your own creativity to life.\n\nInteractive Art Installations: Engage with thought-provoking and interactive art installations that challenge your perception and invite you to be part of the art.\n\nArtists\' Talks: Gain insights into the minds of artists through panel discussions and Q&A sessions. Discover the inspirations and stories behind their creations.\n\nLive Art Performances: Be mesmerized by live art demonstrations, where artists transform blank canvases into beautiful masterpieces right before your eyes.\n\nArtisan Market: Explore a market featuring unique art and craft items, offering you a chance to take home a piece of the event.\n\nArt Appreciation: Dive into the world of art history and critique. Develop a deeper understanding of the significance of art and its impact on culture.\n\nCommunity Art Projects: Contribute to collaborative art projects that will become a lasting legacy of this creative gathering.\n\n\"Artistry Unveiled: A Creative Exploration\" is your invitation to connect with the art community, find inspiration, and celebrate the magic of artistic expression. Join us on this artistic journey and let your imagination run free. Secure your tickets now and become part of this vibrant tapestry of creativity and innovation!', '2023-11-16', '10:00:00', 'Plaça D\'espanya, 08014 Barcelona, Barcelona, Spain', 2.14800640000000000000000000000000000000, 41.37487850000000000000000000000000000000, 'https://i.ibb.co/6vVvqbY/gallery.jpg', '2023-11-08 18:41:52', '2023-11-08 18:41:52');

-- --------------------------------------------------------

--
-- Table structure for table `event_categories`
--

CREATE TABLE `event_categories` (
  `id_categories` int(11) NOT NULL,
  `name_category` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_categories`
--

INSERT INTO `event_categories` (`id_categories`, `name_category`) VALUES
(1, 'Career/Business'),
(4, 'Culture'),
(5, 'Games'),
(6, 'Music'),
(9, 'Social'),
(10, 'Sport'),
(8, 'Tech'),
(11, 'Well Being');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` blob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `image`, `created_at`, `updated_at`) VALUES
(1, 'tom', 'tom@mail.com', '$2a$08$mZ0tBewOj3kMigX0SNb52e4yjwqQMbKxQ2J6HKwVLj1GUCDUXEcHO', NULL, '2023-10-31 20:46:52', '2023-11-03 21:25:40'),
(9, 'paula', 'paula@mail.com', '$2a$08$Td0Dpu099o9IyYsCZYSqteoR5hXel9qg9lmFR5RYcoNYe.pOj4qs2', NULL, '2023-11-08 17:35:13', '2023-11-08 18:31:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `event_categories`
--
ALTER TABLE `event_categories`
  ADD PRIMARY KEY (`id_categories`),
  ADD KEY `name_category` (`name_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `event_categories`
--
ALTER TABLE `event_categories`
  MODIFY `id_categories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`category`) REFERENCES `event_categories` (`name_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
