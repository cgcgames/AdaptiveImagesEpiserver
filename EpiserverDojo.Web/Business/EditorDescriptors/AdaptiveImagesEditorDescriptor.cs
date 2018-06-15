using EPiServer.Core;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;

namespace EpiserverDojo.Web.Business.EditorDescriptors
{
    /// <summary>
    /// Register an editor for AdaptiveImages property
    /// </summary>
    [EditorDescriptorRegistration(TargetType = typeof(AdaptiveImages), UIHint = "AdaptiveImages")]
    public class AdaptiveImagesEditorDescriptor : EditorDescriptor
    {
        public AdaptiveImagesEditorDescriptor()
        {
            //{Namespace defined in the model.config}/{the folder name inside ClientResources/Scripts}/{The Name of the script file minus the .js}
            ClientEditingClass = "adaptiveimages/AdaptiveImagesPlugin/AdaptiveImagesEditor";
        }
    }

    public class AdaptiveImages
    {
        public bool IsCustom { get; set; }
        public ContentReference UltraWide { get; set; }
        public ContentReference Large { get; set; }
        public ContentReference Medium { get; set; }
        public ContentReference Small { get; set; }
    }
}