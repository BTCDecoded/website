// OpenNode Bitcoin payment integration
// Calls VPS API endpoints for invoice creation and payment handling

const OPENNODE_API_KEY = 'YOUR_OPENNODE_API_KEY'; // Replace with your OpenNode API key
const VPS_API_URL = 'YOUR_VPS_URL'; // Replace with actual VPS URL

document.addEventListener('DOMContentLoaded', function() {
    const bitcoinPayBtn = document.getElementById('bitcoin-pay');
    const modal = document.getElementById('payment-modal');
    const modalContent = document.getElementById('invoice-content');
    const closeBtn = document.querySelector('.close');
    
    // Bitcoin payment button click handler
    if (bitcoinPayBtn) {
        bitcoinPayBtn.addEventListener('click', function() {
            createBitcoinInvoice();
        });
    }
    
    // Modal close handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

async function createBitcoinInvoice() {
    const modal = document.getElementById('payment-modal');
    const modalContent = document.getElementById('invoice-content');
    
    // Show modal with loading state
    modal.style.display = 'block';
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1rem;">⏳</div>
            <p>Creating Bitcoin invoice...</p>
            <p style="font-size: 0.9rem; color: #666;">This may take a few seconds</p>
        </div>
    `;
    
    try {
        // Call VPS API to create OpenNode invoice
        const response = await fetch(`${VPS_API_URL}/api/create-invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 10,
                currency: 'USD',
                description: 'Bitcoin Commons: Decentralizing the Decentralizers',
                customer_email: '', // Will be collected in OpenNode checkout
                webhook_url: `${VPS_API_URL}/api/webhook`
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.invoice) {
            displayInvoice(data.invoice);
        } else {
            throw new Error(data.error || 'Failed to create invoice');
        }
        
    } catch (error) {
        console.error('Error creating invoice:', error);
        displayError(error.message);
    }
}

function displayInvoice(invoice) {
    const modalContent = document.getElementById('invoice-content');
    
    // Format amount for display
    const amount = invoice.amount || '10.00';
    const currency = invoice.currency || 'USD';
    
    modalContent.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: #F7931A; margin-bottom: 1.5rem;">Pay with Bitcoin</h3>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <div style="font-size: 2rem; font-weight: bold; color: #F7931A; margin-bottom: 0.5rem;">
                    ${amount} ${currency}
                </div>
                <p style="color: #666; margin-bottom: 1rem;">Bitcoin Commons: Decentralizing the Decentralizers</p>
            </div>
            
            ${invoice.lightning_invoice ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 1rem;">Lightning Payment</h4>
                    <div style="background: white; padding: 1rem; border: 1px solid #ddd; border-radius: 4px; word-break: break-all; font-family: monospace; font-size: 0.9rem;">
                        ${invoice.lightning_invoice}
                    </div>
                    <button onclick="copyToClipboard('${invoice.lightning_invoice}')" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #F7931A; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Copy Lightning Invoice
                    </button>
                </div>
            ` : ''}
            
            ${invoice.bitcoin_address ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 1rem;">Bitcoin Address</h4>
                    <div style="background: white; padding: 1rem; border: 1px solid #ddd; border-radius: 4px; word-break: break-all; font-family: monospace; font-size: 0.9rem;">
                        ${invoice.bitcoin_address}
                    </div>
                    <button onclick="copyToClipboard('${invoice.bitcoin_address}')" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #F7931A; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Copy Bitcoin Address
                    </button>
                </div>
            ` : ''}
            
            ${invoice.qr_code ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 1rem;">QR Code</h4>
                    <div style="text-align: center;">
                        <img src="${invoice.qr_code}" alt="Bitcoin QR Code" style="max-width: 200px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
            ` : ''}
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 1rem; margin-bottom: 1.5rem;">
                <p style="margin: 0; font-size: 0.9rem; color: #856404;">
                    <strong>After payment:</strong> You'll receive an email with a secure download link for the PDF.
                </p>
            </div>
            
            <div style="font-size: 0.8rem; color: #666;">
                <p>Payment processing by <a href="https://opennode.com" target="_blank" style="color: #F7931A;">OpenNode</a></p>
                <p>Invoice ID: ${invoice.id || 'N/A'}</p>
            </div>
        </div>
    `;
}

function displayError(message) {
    const modalContent = document.getElementById('invoice-content');
    
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="margin-bottom: 1rem; font-size: 2rem;">❌</div>
            <h3 style="color: #dc3545; margin-bottom: 1rem;">Payment Error</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">${message}</p>
            <button onclick="createBitcoinInvoice()" style="padding: 0.75rem 1.5rem; background: #F7931A; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#F7931A';
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        alert('Failed to copy to clipboard. Please copy manually.');
    });
}

// Payment status checking (optional - for real-time updates)
function checkPaymentStatus(invoiceId) {
    // This would poll the VPS API to check if payment was received
    // Implementation depends on your VPS backend
    console.log('Checking payment status for invoice:', invoiceId);
}

// Webhook handling (if needed for real-time updates)
function handlePaymentWebhook(data) {
    // This would be called if you implement real-time payment status updates
    console.log('Payment webhook received:', data);
}

// Utility function to format Bitcoin amounts
function formatBitcoinAmount(sats) {
    return (sats / 100000000).toFixed(8) + ' BTC';
}

// Utility function to format USD amounts
function formatUSD(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}
