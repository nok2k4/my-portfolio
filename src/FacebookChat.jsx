import React, { useEffect, useContext } from 'react';
import { DataContext } from './DataContext';

const FacebookChat = () => {
  const { data } = useContext(DataContext);
  // We will read the fbPageId from the Vietnamese section
  const pageId = data.vi?.contact?.fbPageId;

  useEffect(() => {
    if (!pageId) return;

    // Set attributes on the chatbox div
    const chatbox = document.getElementById('fb-customer-chat');
    if (chatbox) {
      chatbox.setAttribute("page_id", pageId);
      chatbox.setAttribute("attribution", "biz_inbox");
    }

    // Initialize FB SDK
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          xfbml            : true,
          version          : 'v18.0'
        });
      }
    };

    // Load FB SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }, [pageId]);

  // If no Page ID is provided in Admin, don't render the chat bubble
  if (!pageId) return null;

  return (
    <>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};

export default FacebookChat;
