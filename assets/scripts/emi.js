// Load profile data on page load
window.addEventListener('DOMContentLoaded', function () {
    loadProfile();
});

function saveProfile() {
    const shopName = document.getElementById('shopName').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;

    // Save to localStorage
    localStorage.setItem('shopName', shopName);
    localStorage.setItem('address', address);
    localStorage.setItem('contact', contact);

    alert('Profile saved successfully!');
    updateProfileDisplay();
}

function loadProfile() {
    // Load from localStorage
    const shopName = localStorage.getItem('shopName') || '';
    const address = localStorage.getItem('address') || '';
    const contact = localStorage.getItem('contact') || '';

    // Fill the input fields
    document.getElementById('shopName').value = shopName;
    document.getElementById('address').value = address;
    document.getElementById('contact').value = contact;

    // Update display for print
    updateProfileDisplay();
}

function updateProfileDisplay() {
    const shopName = document.getElementById('shopName').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;

    const profileDisplay = document.getElementById('profileDisplay');

    if (shopName || address || contact) {
        profileDisplay.innerHTML = `
                    <h3>${shopName || 'Shop Name'}</h3>
                    <p>${address || 'Address'}</p>
                    <p>${contact || 'Contact Number'}</p>
                `;
        profileDisplay.style.display = 'none'; // Hidden on screen, visible on print
    } else {
        profileDisplay.innerHTML = '';
    }
}

function addSignatureSection() {
    // Remove existing signature section if it exists
    const existingSignature = document.querySelector('.signature-section');
    if (existingSignature) {
        existingSignature.remove();
    }
    const signatureHTML = `
        <div class="signature-section">

            <div class="signature-line">
                <p>উপভোক্তা স্বাক্ষর: _________________________</p>
            </div>
   
        </div>
    `;

    // Insert signature section after the notice div
    const noticeDiv = document.getElementById('notice');
    noticeDiv.insertAdjacentHTML('afterend', signatureHTML);
}

function generate() {
    // Clear previous error, notice, and table content
    document.getElementById('error').textContent = '';
    document.getElementById('notice').textContent = '';
    document.getElementById('emiTableBody').innerHTML = '';

    // Get input values
    const emi1 = parseFloat(document.getElementById('emi1').value);
    const emi2 = parseFloat(document.getElementById('emi2').value);
    const noOfEmis = parseInt(document.getElementById('no_of_emis').value);
    const emiDate = document.getElementById('emi_date').value;
    const selectedProvider = document.getElementById('loanProvider');

    // Validate inputs
    if (isNaN(emi1) || isNaN(emi2) || isNaN(noOfEmis) || !emiDate) {
        document.getElementById('error').textContent = 'Please fill in all fields with valid values.';
        return;
    }
    if (emi1 < 0 || emi2 < 0) {
        document.getElementById('error').textContent = 'EMI amounts cannot be negative.';
        return;
    }
    if (noOfEmis < 1) {
        document.getElementById('error').textContent = 'Number of EMIs must be at least 1.';
        return;
    }

    // Display notice based on selected radio button
    const provider = selectedProvider.value;
    const notices = {
        'TVS': `TVS ক্রেডিট সার্ভিসেস
সম্মানিত গ্রাহক,
আপনার বাজাজ ফাইন্যান্স ঋণ সংক্রান্ত কিছু গুরুত্বপূর্ণ নির্দেশনা নিচে প্রদান করা হলো। অনুগ্রহ করে মনোযোগসহ পড়ুন ও অনুসরণ করুন।

১. কিস্তি খেলাপ সংক্রান্ত নিয়মাবলী

কিস্তি পরিশোধে বিলম্ব হলে ₹৫০০ (পাঁচশত টাকা) জরিমানা প্রযোজ্য হবে।
এছাড়াও, ব্যাংকের নিয়ম অনুযায়ী এক বা একাধিকবার ব্যাংক চার্জ কাটা হবে।

২. কিস্তি পরিশোধের নির্দেশনা

প্রত্যেক মাসের ১ তারিখ আপনার ব্যাংক অ্যাকাউন্টে ন্যূনতম ব্যালেন্স সহ কিস্তির পর্যাপ্ত পরিমাণ টাকা রাখুন।
অথবা, কিস্তির তারিখের ৭ (সাত) দিন আগে আপনার লোন নম্বারে টাকা জমা করুন।
এতে করে কিস্তি সময়মতো পরিশোধ হবে এবং জরিমানার সম্ভাবনা থাকবে না।

৩. ফোন হারানো বা চুরি সংক্রান্ত নির্দেশনা

যদি আপনার ফোন হারিয়ে যায় বা চুরি হয়, তাহলেও কিস্তি বন্ধ করা যাবে না।
আপনাকে নির্ধারিত সময়ে কিস্তি অবশ্যই পরিশোধ করতে হবে।

৪. নিরাপত্তা সতর্কতা
আপনার আর্থিক নিরাপত্তার স্বার্থে, কোনও অচেনা ব্যক্তির সঙ্গে OTP বা ব্যাংক সংক্রান্ত তথ্য শেয়ার করবেন না। এতে আপনার আর্থিক ক্ষয়ক্ষতি হলে কোম্পানি দায়ী থাকবে না।`,

        'Bajaj': `বাজাজ ফাইন্যান্স (Bajaj Finserv)
সম্মানিত গ্রাহক,
আপনার টি ভি এস ক্রেডিট ফাইন্যান্স ঋণ সংক্রান্ত কিছু গুরুত্বপূর্ণ নির্দেশনা নিচে প্রদান করা হলো। অনুগ্রহ করে মনোযোগসহ পড়ুন ও অনুসরণ করুন।

১. কিস্তি খেলাপ সংক্রান্ত নিয়মাবলী

কিস্তি পরিশোধে বিলম্ব হলে ₹৬৫০ (ছয়শত পঞ্চাশ টাকা) জরিমানা প্রযোজ্য হবে।
এছাড়াও, ব্যাংকের নিয়ম অনুযায়ী এক বা একাধিকবার ব্যাংক চার্জ কাটা হবে।

২. কিস্তি পরিশোধের নির্দেশনা

প্রত্যেক মাসের ১ তারিখ আপনার ব্যাংক অ্যাকাউন্টে ন্যূনতম ব্যালেন্স সহ কিস্তির পর্যাপ্ত পরিমাণ টাকা রাখুন।
অথবা, কিস্তির তারিখের ৭ (সাত) দিন আগে আপনার লোন নম্বারে টাকা জমা করুন।
এতে করে কিস্তি সময়মতো পরিশোধ হবে এবং জরিমানার সম্ভাবনা থাকবে না।

৩. ফোন হারানো বা চুরি সংক্রান্ত নির্দেশনা

যদি আপনার ফোন হারিয়ে যায় বা চুরি হয়, তাহলেও কিস্তি বন্ধ করা যাবে না।
আপনাকে নির্ধারিত সময়ে কিস্তি অবশ্যই পরিশোধ করতে হবে।

৪. নিরাপত্তা সতর্কতা
আপনার আর্থিক নিরাপত্তার স্বার্থে, কোনও অচেনা ব্যক্তির সঙ্গে OTP বা ব্যাংক সংক্রান্ত তথ্য শেয়ার করবেন না। এতে আপনার আর্থিক ক্ষয়ক্ষতি হলে কোম্পানি দায়ী থাকবে না।`,

        'Samsung': `স্যামসাং ফাইন্যান্স+
সম্মানিত গ্রাহক,
আপনার এইচ ডি বি ফাইন্যান্স ঋণ সংক্রান্ত কিছু গুরুত্বপূর্ণ নির্দেশনা নিচে প্রদান করা হলো। অনুগ্রহ করে মনোযোগসহ পড়ুন ও অনুসরণ করুন।

১. কিস্তি খেলাপ সংক্রান্ত নিয়মাবলী

কিস্তি পরিশোধে বিলম্ব হলে ₹৪৭২ (চার বাহাত্তর টাকা) জরিমানা প্রযোজ্য হবে।
এছাড়াও, ব্যাংকের নিয়ম অনুযায়ী এক বা একাধিকবার ব্যাংক চার্জ কাটা হবে।

২. কিস্তি পরিশোধের নির্দেশনা

প্রত্যেক মাসের ১ তারিখ আপনার ব্যাংক অ্যাকাউন্টে ন্যূনতম ব্যালেন্স সহ কিস্তির পর্যাপ্ত পরিমাণ টাকা রাখুন।
অথবা, কিস্তির তারিখের ৭ (সাত) দিন আগে আপনার লোন নম্বারে টাকা জমা করুন।
এতে করে কিস্তি সময়মতো পরিশোধ হবে এবং জরিমানার সম্ভাবনা থাকবে না।

৩. ফোন হারানো বা চুরি সংক্রান্ত নির্দেশনা

যদি আপনার ফোন হারিয়ে যায় বা চুরি হয়, তাহলেও কিস্তি বন্ধ করা যাবে না।
আপনাকে নির্ধারিত সময়ে কিস্তি অবশ্যই পরিশোধ করতে হবে।

৪. নিরাপত্তা সতর্কতা
আপনার আর্থিক নিরাপত্তার স্বার্থে, কোনও অচেনা ব্যক্তির সঙ্গে OTP বা ব্যাংক সংক্রান্ত তথ্য শেয়ার করবেন না। এতে আপনার আর্থিক ক্ষয়ক্ষতি হলে কোম্পানি দায়ী থাকবে না।`
    };
    document.getElementById('notice').textContent = notices[provider];

    // Generate EMI schedule
    const tbody = document.getElementById('emiTableBody');
    const startDate = new Date(emiDate);

    for (let i = 0; i < noOfEmis; i++) {
        const emiAmount = i === 0 ? emi1 : emi2;

        // Calculate Online Date (add i months to start date)
        const onlineDate = new Date(startDate);
        onlineDate.setMonth(startDate.getMonth() + i);
        const onlineDateStr = onlineDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Calculate Offline Date (25th of the previous month)
        const offlineDate = new Date(startDate);
        offlineDate.setMonth(startDate.getMonth() + i - 1);
        offlineDate.setDate(25);
        const offlineDateStr = offlineDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Create table row
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${offlineDateStr}</td>
                    <td>${onlineDateStr}</td>
                    <td>${emiAmount.toFixed(2)}</td>
                    <td></td>
                `;
        tbody.appendChild(row);
    }
    addSignatureSection();
}

function printSchedule() {
    window.print();
}
