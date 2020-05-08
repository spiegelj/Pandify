using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Songify.Models
{
    // A metadata object to allow for simple or cosmetic information to pass to views, allowing individual views more flexibility
    // in servicing multiple purposes
    public class ViewAttributesModel
    {
        // Name of what's going on.  Likely used as a header or title.
        // Example, a song list view may need to differentiate between whether it's listing a library, a particular service's 
        // library, a specific playlist or the results of a search.  Rather than having four separate views, simply changing a 
        // heading may suffice to use the same view.
        public string purpose;
    }
}
