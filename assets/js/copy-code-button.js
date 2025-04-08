document.addEventListener('DOMContentLoaded', () => {
    const copyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
  </svg>`;
  
    const copiedIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
  </svg>`;
  
    // Find all <pre> elements that directly contain a <code> element
    const preBlocks = document.querySelectorAll('.design-item-steps pre > code');
  
    preBlocks.forEach(codeBlock => {
      const preElement = codeBlock.parentElement; // Get the parent <pre>
  
      // Create a wrapper div
      const wrapper = document.createElement('div');
      wrapper.classList.add('code-copy-wrapper');
  
      // Wrap the <pre> element
      preElement.parentNode.insertBefore(wrapper, preElement);
      wrapper.appendChild(preElement);
  
      // Create the copy button
      const copyButton = document.createElement('button');
      copyButton.classList.add('copy-code-button');
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      copyButton.title = 'Copy code to clipboard'; // Tooltip
      copyButton.innerHTML = copyIconSvg;
  
      // Append the button to the wrapper
      wrapper.appendChild(copyButton);
  
      // Add click event listener
      copyButton.addEventListener('click', async () => {
        const codeToCopy = codeBlock.textContent || '';
        try {
          await navigator.clipboard.writeText(codeToCopy);
  
          // Visual feedback
          copyButton.innerHTML = copiedIconSvg;
          copyButton.classList.add('copied');
          copyButton.title = 'Copied!'; // Update tooltip
  
  
          // Revert back after a delay
          setTimeout(() => {
            copyButton.innerHTML = copyIconSvg;
            copyButton.classList.remove('copied');
            copyButton.title = 'Copy code to clipboard'; // Reset tooltip
          }, 2000); // Revert after 2 seconds
  
        } catch (err) {
          console.error('Failed to copy text: ', err);
          copyButton.title = 'Failed to copy'; // Error tooltip
           // Optionally indicate error visually, e.g., change icon color
           setTimeout(() => {
              copyButton.title = 'Copy code to clipboard'; // Reset tooltip after error
           }, 2000);
        }
      });
    });
  });