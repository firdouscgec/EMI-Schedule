
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
    const selectedProvider = document.querySelector('input[name="loan-provider"]:checked');

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
    if (!selectedProvider) {
        document.getElementById('error').textContent = 'Please select a loan provider.';
        return;
    }

    // Display notice based on selected radio button
    const provider = selectedProvider.value;
    const notices = {
        'TVS': `TVS ক্রেডিট সার্ভিসেস
• ঋণের জন্য আবেদন করার সময় আবেদনকারীর বয়স ২১ থেকে ৬৫ বছরের মধ্যে হতে হবে এবং তিনি ভারতের নাগরিক হতে হবে।
• অর্থায়িত যানবাহন বা পণ্য সম্পূর্ণ ঋণ পরিশোধ না হওয়া পর্যন্ত TVS ক্রেডিটের অধীনে বন্ধক (hypothecated) থাকবে।
• আগাম পরিশোধ (prepayment) বা ঋণ বন্ধ (foreclosure) করা যেতে পারে, তবে একটি ছোট জরিমানা ধার্য হতে পারে।`,

        'Bajaj': `বাজাজ ফাইন্যান্স (Bajaj Finserv)
• যে কোনো বাজাজ ফাইন্যান্স EMI বা ঋণের জন্য আবেদন করতে বৈধ KYC (PAN, আধার ইত্যাদি) আবশ্যক।
• নির্ধারিত EMI তারিখে অর্থ প্রদান না করলে বিলম্ব ফি (late payment charges) প্রযোজ্য হবে।
• কোম্পানি ঋণ পরিশোধে ব্যর্থতার ঘটনা CIBIL-এর মতো ক্রেডিট ব্যুরোতে রিপোর্ট করতে পারে, যা আপনার ক্রেডিট স্কোরে প্রভাব ফেলতে পারে।`,

        'Samsung': `স্যামসাং ফাইন্যান্স+
• স্যামসাং ফাইন্যান্স+ এর জন্য আবেদন করতে আপনার বয়স কমপক্ষে ২২ বছর হতে হবে।
• এক সময়ে আপনার নামে শুধুমাত্র একটি সক্রিয় ঋণ থাকতে পারবে।
• যদি ক্রয়কৃত পণ্য ফেরত দেওয়া হয় বা পরিবর্তন করা হয়, তাহলে ঋণটি স্বয়ংক্রিয়ভাবে বাতিল হয়ে যাবে।`

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
}

function printSchedule() {
    window.print();
}
