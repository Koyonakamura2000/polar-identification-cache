import './PrivacyPolicy.css';

// modal styles from https://www.w3schools.com/howto/howto_css_modals.asp
function PrivacyPolicy() {
    
    function hideModal() {
        document.getElementById('privacy-policy').classList.add('hidden');
    }

    return (
        <div id='privacy-policy' className="modal">
            <div className="modal-content">
                <span className="close" onClick={hideModal}>&times;</span>
                <h1>Privacy Policy</h1>
                <p>Before contributing photos, please keep the following in mind:</p>
                <ol>
                    <li>Photos will be visible and downloadable by any visitors of the website.</li>
                    <li>You will be able to view and, if desired, delete your personal contributions by going to your personal profile.</li>
                </ol>
            </div>
      </div>
    );
}

export default PrivacyPolicy;