using System;
using System.Web.Script.Serialization;
using EpiserverDojo.Web.Business.EditorDescriptors;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.PlugIn;

namespace EpiserverDojo.Web.Models.Properties
{
    //EditorHint maps this property to our editor descriptor.
    [EditorHint("AdaptiveImages")]
    [PropertyDefinitionTypePlugIn(Description = "A property for Adaptive Images", DisplayName = "Property Adaptive Images")]
    public class PropertyAdaptiveImages : PropertyLongString
    {
        public override Type PropertyValueType
        {
            //defines the return type, This will return type of AdaptiveImages when the content is parsed to the view
            get { return typeof(AdaptiveImages); }
        }

        public override object Value
        {
            get
            {
                //get value as string
                var value = base.Value as string;
                if (value == null)
                {
                    //return null if value is null after parsing it as a string
                    return null;
                }
                //deserialize the string as an AdaptiveImages object
                var serializer = new JavaScriptSerializer();
                return serializer.Deserialize(value, typeof(AdaptiveImages));
            }
            set
            {
                if (value is AdaptiveImages)
                {
                    //serialize content if content is AdatpiveImages 
                    var serializer = new JavaScriptSerializer();
                    base.Value = serializer.Serialize(value);
                }
                else
                {
                    //parse value if it is not AdaptiveImages (we persume it is already serlized)
                    base.Value = value;
                }
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            return LongString;
        }

    }
}
