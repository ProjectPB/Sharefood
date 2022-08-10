import React from 'react';
import Logo from '../../components/Logo';

import './styles.scss';

const PrivacyPage = () => {
  return (
    <div className='privacy'>
      <div className="privacy__logo">
        <Logo />
      </div>

      <div className="privacy__wrapper">
        <h1>Privacy Policy</h1>
        <p>This privacy policy sets out how Sharefood uses and protects any information that you give while using sharefood.pl</p>
        <p>Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.</p>
        <p>Sharefood may change this policy by updating this page.</p>

        <div className="privacy__container">
          <h2>
            What information do we collect?
          </h2>
          <p>
            <span>Information You Voluntarily Submit to the Website</span>: We may collect personal information from you such as your name or email address. For example, you may voluntarily submit information to the Website by leaving a comment or submiting a recipe. In addition, you are able to create a user profile, which allows you to create a username and password. We will store the username, but your password will not be visible in our records.
          </p>
          <p>
            <span>Information We Collect from Others</span>: We may receive information about you from other sources. You may link your Google account to your user profile. If you choose to link your Google account to your user profile, we will receive your name, email address and profile picture associated with that account.
          </p>
          <p>
            <span>Automatically collected Information</span>: We automatically collect certain information about you and the device with which you access the Website. For example, when you use the Website, we will log your IP address, operating system type, browser type, referring website, pages you viewed, and the dates/times when you accessed the Website. We may also collect information about actions you take when using the Website, such as links clicked.
          </p>
          <p>
            <span>Cookies</span>: We may log information using cookies, which are small data files stored on your browser by the Website. We may use both session cookies, which expire when you close your browser, and persistent cookies, which stay on your browser until deleted, to provide you with a more personalized experience on the Website.
          </p>
        </div>

        <div className="privacy__container">
          <h2>
            How we use the information we collect?
          </h2>
          <p>We may use the information collected in the following ways:</p>
          <ul>
            <li>To operate and maintain the Website;</li>
            <li>To create your account, identify you as a user of the Website, and customize the Website for your account;</li>
            <li>To send you administrative communications, such as administrative emails, confirmation emails, technical notices, updates on policies, or security alerts;</li>
            <li>To respond to your comments or inquiries;</li>
            <li>To provide you with user support;</li>
            <li>To track and measure advertising on the Website;</li>
            <li>To protect, investigate, and deter against unauthorized or illegal activity.</li>
          </ul>
        </div>

        <div className="privacy__container">
          <h2>Third-party use of personal information</h2>
          <p>We may share your information with third parties when you explicitly authorize us to share your information.</p>
          <p>Additionally, the Website may use third-party service providers to service various aspects of the Website. Each third-party service provider's use of your personal information is dictated by their respective privacy policies.
          </p>
          <br />
          <p>The Website currently uses the following third-party service providers:</p>
          <ul>
            <li><span>Google Analytics</span> – this service tracks Website usage and provides information such as referring websites and user actions on the Website. Google Analytics may capture your IP address, but no other personal information is captured by Google Analytics. Some browsers may allow you to opt out of their data being used by Google Analytics. Go <a rel="noreferrer" target="_blank" href="https://tools.google.com/dlpage/gaoptout">here</a>.</li>
            <li><span>Google AdSense</span> – We use Google Adsense to display ads on some of our pages. Google AdSense may use user data.</li>
            <li><span>Algolia</span> – We provide full text search functionality using Algolia. Algolia may use user data. You can find more information <a rel="noreferrer" target="_blank" href="https://www.algolia.com/policies/privacy/">here.</a></li>
          </ul>
          <br />
          <p>
            Except when required by law, we will not sell, distribute, or reveal your email addresses or other personal information without your consent; however, we may disclose or transfer personal information collected through the Website to third parties who acquire all or a portion of our business, which may be the result of a merger, consolidation, or purchase of all or a portion of our assets, or in connection with any bankruptcy or reorganization proceeding brought by or against us.</p>
        </div>

        <div className="privacy__container">
          <h2>Publicly visible information</h2>
          <p>Certain information may be publicly visible.</p>
          <p>Your profile picture and username will be publicly visible in certain places on the website such as recipes data, user's profile and comments. Other users might also see data of the uploaded recipe by you.</p>
          <p>Your email address will never be available publicly.</p>
        </div>

        <div className="privacy__container">
          <h2>Rights related to your personal information</h2>
          <p>If you have an account on this site, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
          <ul>
            <li><span>Access</span> – You may access the personal information we have about you by submitting a request to sharefood.pl</li>
            <li><span>Amend</span> – You may contact us at sharefood.pl to amend or update your personal information.</li>
            <li><span>Forget</span> – In certain situations, you may request that we erase or forget your personal data. To do so, please submit a request to sharefood.pl</li>
          </ul>
          <p>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us.</p>
        </div>

        <div className="privacy__container">
          <h2>Cookies</h2>
          <p>We will set up several cookies to save your login information and your screen display choices. Cookies last indefinitely. If you log out of your account, the login cookies will be removed.</p>
          <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
          <p>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work the following social media sites including; Facebook, Instagram, Pinterest, Twitter, Tumblr, Mix, and Yummly will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.</p>
          <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
        </div>

        <div className="privacy__container">
          <h2>Children's information</h2>
          <p>The Website does not knowingly collect any personally identifiable information from children under the age of 16. If a parent or guardian believes that the Website has personally identifiable information of a child under the age of 16 in its database, please contact us immediately at info@lovefoodnourish.com and we will use our best efforts to promptly remove such information from our records.</p>
        </div>

        <div className="privacy__container">
          <h2>
            How to contact us
          </h2>
          <p>If you would like to contact us please send us an email at pbprojects01@gmail.com.</p>
          <p>Last Updated: August 2022</p>
        </div>
      </div>
    </div >
  )
}

export default PrivacyPage;