/**
 * Analytics utility functions for Milo the Math Mouse
 *
 * This file contains functions to track user interactions
 * using Google Analytics (GA4).
 */

/**
 * Track a page view in Google Analytics
 * @param {string} pageName - The name of the page being viewed
 */
export const trackPageView = (pageName) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_title: pageName,
      page_location: window.location.href,
      page_path:
        window.location.pathname +
        window.location.search +
        window.location.hash,
    });
  }
};

/**
 * Track an event in Google Analytics
 * @param {string} eventName - The name of the event
 * @param {Object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track a page interaction in the book
 * @param {number} pageNumber - The page number being interacted with
 * @param {string} interactionType - The type of interaction (e.g., 'view', 'complete')
 */
export const trackPageInteraction = (pageNumber, interactionType) => {
  trackEvent("page_interaction", {
    page_number: pageNumber,
    interaction_type: interactionType,
  });
};

/**
 * Track when an activity is completed
 * @param {string} activityName - The name of the activity
 * @param {boolean} success - Whether the activity was completed successfully
 * @param {number} attempts - Number of attempts made
 */
export const trackActivityCompletion = (
  activityName,
  success,
  attempts = 1
) => {
  trackEvent("activity_completion", {
    activity_name: activityName,
    success: success,
    attempts: attempts,
  });
};

/**
 * Track when the book is started from the beginning
 */
export const trackBookStarted = () => {
  trackEvent("book_started");
};

/**
 * Track when the book is completed (reached the ending page)
 */
export const trackBookCompleted = () => {
  trackEvent("book_completed");
};

/**
 * Track when the book is restarted
 */
export const trackBookRestarted = () => {
  trackEvent("book_restarted");
};
