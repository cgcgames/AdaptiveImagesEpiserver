using System.ComponentModel.DataAnnotations;
using EpiserverDojo.Web.Business.EditorDescriptors;
using EpiserverDojo.Web.Models.Properties;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;

namespace EpiserverDojo.Web.Models.Pages
{
    /// <summary>
    /// Used for campaign or landing pages, commonly used for pages linked in online advertising such as AdWords
    /// </summary>
    [SiteContentType(
       GUID = "DBED4258-8213-48DB-A11F-99C034172A54",
       GroupName = Global.GroupNames.Specialized)]
    [SiteImageUrl]
    public class LandingPage : SitePageData
    {
        [Display(
            GroupName = SystemTabNames.Content,
            Order=310)]
        [CultureSpecific]
        public virtual ContentArea MainContentArea { get; set; }

        [Display(
            Name = "Image",
            Description = "please specify an image",
            GroupName = SystemTabNames.Content,
            Order = 15)]
        [Required(ErrorMessage = "Please select all the images required")]
        [UIHint("AdaptiveImages")]
        [BackingType(typeof(PropertyAdaptiveImages))]
        public virtual AdaptiveImages AdaptiveImages { get; set; }

        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);

            HideSiteFooter = true;
            HideSiteHeader = true;
        }
    }
}
