using EPiServer.Core;

namespace EpiserverDojo.Web.Models.Pages
{
    public interface IHasRelatedContent
    {
        ContentArea RelatedContentArea { get; }
    }
}
